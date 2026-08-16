import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const rootDir = process.cwd();

  app.use(express.json());

  // Lazy initialize GenAI client
  let aiClient: GoogleGenAI | null = null;
  function getGenAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        console.warn('GEMINI_API_KEY is missing or default.');
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey || '',
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // In-memory cache for weather data to prevent 429 quota exhaustion
  let weatherCache: { data: any; timestamp: number } | null = null;
  const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

  // API Endpoint: Live Nile & Venue Weather with Gemini Search Grounding
  app.get('/api/weather', async (req, res) => {
    const forceRefresh = req.query.force === 'true';

    // Serve from cache if available and fresh
    if (!forceRefresh && weatherCache && (Date.now() - weatherCache.timestamp < CACHE_TTL_MS)) {
      return res.json({
        success: true,
        isCached: true,
        data: weatherCache.data,
      });
    }

    const fallbackData = {
      tempC: 28,
      condition: 'أجواء نيلية لطيفة وسماء صافية',
      humidity: '56%',
      windSpeed: '13 كم/س',
      iconType: 'clear_night',
      location: 'كورنيش النيل والقاعة - جدة / الحرازات',
      eventAdvice: 'طقس ممتاز جداً لإقامة الزفة الخارجية وجلسات الحوش الفاخرة',
      groundingSources: [
        { title: 'الرصد الجوي لكورنيش النيل وجدة', uri: 'https://weather.com' }
      ],
      updatedAt: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    };

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        weatherCache = { data: fallbackData, timestamp: Date.now() };
        return res.json({
          success: true,
          isMock: true,
          data: fallbackData
        });
      }

      const ai = getGenAI();
      const prompt = `Perform a Google Search to get the real-time weather conditions for the Nile river route and Jeddah / Al Harazat area today.
Provide current temperature in Celsius, weather description in Arabic, humidity percentage, wind speed in km/h, icon type ('sunny' | 'clear_night' | 'partly_cloudy' | 'breezy'), location name in Arabic, and a brief 1-sentence recommendation for hosting outdoor evening wedding events at Al Bakhera venue.

Respond strictly in valid JSON format with the following keys:
{
  "tempC": 29,
  "condition": "وصف الطقس باللغة العربية",
  "humidity": "55%",
  "windSpeed": "12 كم/س",
  "iconType": "partly_cloudy",
  "location": "كورنيش النيل والملاحة - جدة الحرازات",
  "eventAdvice": "نصيحة الطقس للمناسبات والأفراح"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const responseText = response.text || '';
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      const sources = groundingChunks
        .map((chunk: any) => ({
          title: chunk?.web?.title || 'مصدر الأرصاد الجوية',
          uri: chunk?.web?.uri || '',
        }))
        .filter((s: any) => s.uri);

      let parsedData: any = {};
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(responseText);
        }
      } catch {
        parsedData = {
          tempC: 28,
          condition: responseText.slice(0, 80) || 'أجواء معتدلة ولطيفة بجدة',
          humidity: '55%',
          windSpeed: '12 كم/س',
          iconType: 'clear_night',
          location: 'جدة - الحرازات (قاعة الباخرة)',
          eventAdvice: 'طقس رائع ومناسب للحفل والزفة',
        };
      }

      const freshData = {
        tempC: parsedData.tempC || 28,
        condition: parsedData.condition || 'أجواء لطيفة وسماء صافية بجدة',
        humidity: parsedData.humidity || '55%',
        windSpeed: parsedData.windSpeed || '12 كم/س',
        iconType: parsedData.iconType || 'partly_cloudy',
        location: parsedData.location || 'جدة - الحرازات (موقع القاعة)',
        eventAdvice: parsedData.eventAdvice || 'الطقس ممتاز جداً لحفلات الزفاف وجلسات الحوش',
        groundingSources: sources.length > 0 ? sources : [
          { title: 'الرصد المباشر لطقس جدة والحرازات', uri: 'https://weather.com' }
        ],
        updatedAt: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      };

      weatherCache = { data: freshData, timestamp: Date.now() };

      return res.json({
        success: true,
        isMock: false,
        data: freshData
      });
    } catch (error: any) {
      console.warn('Weather API fallback active due to quota limit or network response.');
      const activeData = weatherCache?.data || fallbackData;
      weatherCache = { data: activeData, timestamp: Date.now() - (CACHE_TTL_MS / 3) };

      return res.json({
        success: true,
        isFallback: true,
        data: activeData
      });
    }
  });

  // Serve all static assets and videos directly from /public and /dist
  const publicDir = path.join(rootDir, 'public');
  const distDir = path.join(rootDir, 'dist');

  // Disable aggressive caching for images to avoid stale 0-byte browser cache, and handle video streaming
  const staticOptions = {
    maxAge: '1h',
    etag: true,
    lastModified: true,
    setHeaders: (res: express.Response, filePath: string) => {
      if (filePath.endsWith('.mp4')) {
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', 'video/mp4');
      } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.png') || filePath.endsWith('.webp')) {
        // Allow revalidation so updated images reload immediately
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
      }
    },
  };

  app.use(express.static(publicDir, staticOptions));
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distDir, staticOptions));
  }

  // Fallback handler for media files: ensure media requests NEVER return index.html
  app.use((req, res, next) => {
    const parsedPath = req.path;
    const isMedia = /\.(jpg|jpeg|png|webp|mp4|svg|ico)$/i.test(parsedPath);
    if (!isMedia) return next();

    let decodedPath: string;
    try {
      decodedPath = decodeURIComponent(parsedPath);
    } catch {
      return res.status(400).json({ success: false, message: 'Invalid media path.' });
    }
    const fileName = path.basename(decodedPath);

    // Search common locations in public/
    const candidates = [
      path.join(publicDir, decodedPath.replace(/^\/+/, '')),
      path.join(publicDir, fileName),
      path.join(publicDir, '01_Featured_Website', fileName),
      path.join(publicDir, '02_Women_Hall', fileName),
      path.join(publicDir, '03_Men_Hall', fileName),
      path.join(publicDir, '04_Dining_Buffet', fileName),
      path.join(publicDir, '05_Exterior_Outdoor_Yard', fileName),
      path.join(publicDir, '06_Facilities', fileName),
      path.join(publicDir, 'Videos', fileName),
      path.join(publicDir, 'Videos', 'posters', fileName),
    ];

    for (const candidate of candidates) {
      const resolvedCandidate = path.resolve(candidate);
      const isInsidePublic = resolvedCandidate.startsWith(`${path.resolve(publicDir)}${path.sep}`);
      if (!isInsidePublic) continue;

      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile() && fs.statSync(candidate).size > 0) {
        if (candidate.endsWith('.mp4')) {
          res.setHeader('Accept-Ranges', 'bytes');
          res.setHeader('Content-Type', 'video/mp4');
        } else if (candidate.endsWith('.png')) {
          res.setHeader('Content-Type', 'image/png');
        } else if (candidate.endsWith('.jpg') || candidate.endsWith('.jpeg')) {
          res.setHeader('Content-Type', 'image/jpeg');
        }
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
        return res.sendFile(candidate);
      }
    }

    // Default media fallbacks
    if (fileName.includes('women') || fileName.includes('نساء')) {
      return res.sendFile(path.join(publicDir, '01_Featured_Website', 'women_03.jpg'));
    } else if (fileName.includes('men') || fileName.includes('رجال')) {
      return res.sendFile(path.join(publicDir, '01_Featured_Website', 'men_15.jpg'));
    } else if (fileName.includes('food') || fileName.includes('buffet') || fileName.includes('طعام')) {
      return res.sendFile(path.join(publicDir, '01_Featured_Website', 'food_01.jpg'));
    } else if (fileName.endsWith('.mp4')) {
      return res.sendFile(path.join(publicDir, 'Videos', 'video_01.mp4'));
    } else {
      return res.sendFile(path.join(publicDir, '01_Featured_Website', 'extra_05.jpg'));
    }
  });

  // Vite Middleware in Development mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(rootDir, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
