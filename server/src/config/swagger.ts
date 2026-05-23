import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const options: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "AI News Recommendation API",
            version: "1.0.0",
            description:
                "AI-powered News Aggregation and Recommendation API"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        servers: [
            {
                url: process.env.API_URL || "http://localhost:5000",
                description: process.env.NODE_ENV === "production"
                    ? "Production Server"
                    : "Development Server"
            }
        ]
    },

    apis: [
        "./src/routes/**/*.ts"
    ]
};

const swaggerSpec =
    swaggerJsDoc(options);

export {
    swaggerUi,
    swaggerSpec
};