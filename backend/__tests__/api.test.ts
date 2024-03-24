const axios = require("axios").default;
const BASE_URL = "http://localhost:3001";
const ENDPOINT = "/machine-health";
const TESTURL = `${BASE_URL}${ENDPOINT}`;

describe("Machine-Health Endpoint Tests - ", () => {
  test("POST - Returns 200, 50% score factory/machcine w/ 2 parts [1 good, 1 bad]", async () => {
    const response = await axios.post(TESTURL, {
      machines: {
        weldingRobot: {
          arcStability: "84",
          errorRate: "1",
        },
      },
    });
    expect(response.status).toBe(200);
    expect(response.data.factory).toBe("50.00");
    expect(response.data.machineScores.weldingRobot).toBe("50.00");
  });
});
