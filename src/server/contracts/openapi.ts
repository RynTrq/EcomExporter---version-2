import { z } from "zod";
import { leadSubmissionSchema } from "@/server/contracts/leads";
import { eventSubmissionSchema } from "@/server/contracts/events";
import { estimateSchema } from "@/lib/calculator";

export function getOpenApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Ecom Exporter Backend API",
      version: "1.0.0",
      description:
        "Public and operational API contracts for Ecom Exporter.",
    },
    paths: {
      "/api/leads": {
        post: {
          summary: "Submit a growth enquiry",
          requestBody: jsonBody(z.toJSONSchema(leadSubmissionSchema)),
          responses: successAndErrors("Lead accepted"),
        },
      },
      "/api/events": {
        post: {
          summary: "Record a bounded analytics event",
          requestBody: jsonBody(z.toJSONSchema(eventSubmissionSchema)),
          responses: successAndErrors("Event accepted"),
        },
      },
      "/api/calculators/estimate": {
        post: {
          summary: "Estimate marketplace profitability",
          requestBody: jsonBody(z.toJSONSchema(estimateSchema)),
          responses: successAndErrors("Estimate returned"),
        },
      },
    },
  };
}

function jsonBody(schema: unknown) {
  return {
    required: true,
    content: {
      "application/json": {
        schema,
      },
    },
  };
}

function successAndErrors(description: string) {
  return {
    "200": { description },
    "201": { description },
    "202": { description },
    "400": { description: "Validation error" },
    "409": { description: "Idempotency conflict" },
    "413": { description: "Request body too large" },
    "429": { description: "Rate limited" },
    "500": { description: "Unexpected server error" },
  };
}

