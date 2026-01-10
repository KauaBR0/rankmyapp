const request = require("supertest");
const express = require("express");

// We'll create the app in the test or import it.
// For now, let's assume we have a src/app.js
const app = require("../src/app");

describe("GET /health", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
});
