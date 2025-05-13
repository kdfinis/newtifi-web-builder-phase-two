import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(compression());

// Security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Development mode - proxy to Vite dev server
if (process.env.NODE_ENV === 'development') {
    (async () => {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        });

        app.use(vite.middlewares);
        
        app.use('*', async (req, res, next) => {
            try {
                const url = req.originalUrl;
                let template = await vite.transformIndexHtml(url, '');
                res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            } catch (e) {
                vite.ssrFixStacktrace(e);
                next(e);
            }
        });
    })();
} else {
    // Production mode - serve static files
    app.use(express.static(path.join(__dirname, 'dist'), {
        maxAge: '1d',
        etag: true,
        lastModified: true
    }));

    // Handle all routes by serving index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`
        <html>
            <head>
                <title>Error - New Technologies and Investment Funds Institute</title>
                <style>
                    body { font-family: 'Inter', sans-serif; padding: 2rem; text-align: center; }
                    h1 { color: #1a365d; }
                    p { color: #2d3748; }
                </style>
            </head>
            <body>
                <h1>Something went wrong</h1>
                <p>We're working on fixing this issue. Please try again later.</p>
            </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Mode:', process.env.NODE_ENV || 'development');
}); 