import "server-only";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogRecord = {
  level: LogLevel;
  message: string;
  requestId?: string;
  route?: string;
  status?: number;
  durationMs?: number;
  errorCode?: string;
  metadata?: Record<string, unknown>;
};

function write(record: LogRecord) {
  const payload = {
    time: new Date().toISOString(),
    service: "ecomexporter-web",
    ...record,
  };

  const line = JSON.stringify(payload);
  if (record.level === "error") {
    console.error(line);
  } else if (record.level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  debug(message: string, metadata?: Omit<LogRecord, "level" | "message">) {
    if (process.env.NODE_ENV !== "production") {
      write({ level: "debug", message, ...metadata });
    }
  },
  info(message: string, metadata?: Omit<LogRecord, "level" | "message">) {
    write({ level: "info", message, ...metadata });
  },
  warn(message: string, metadata?: Omit<LogRecord, "level" | "message">) {
    write({ level: "warn", message, ...metadata });
  },
  error(message: string, metadata?: Omit<LogRecord, "level" | "message">) {
    write({ level: "error", message, ...metadata });
  },
};

