import { it, expect, describe } from "vitest";
import { formatTimestamp } from "./time";

describe("formatTimestamp", () => {
  it("should return a timestamp as m:ss if the given time is less than one hour.", () => {
    let timestamp = formatTimestamp(30);
    expect(timestamp).toMatch(/0:30/);

    timestamp = formatTimestamp(330);
    expect(timestamp).toMatch(/5:30/);

    timestamp = formatTimestamp(722);
    expect(timestamp).toMatch(/12:02/);
  });

  it("should return a timestamp as h:mm:ss if the given time is greater than one hour.", () => {
    let timestamp = formatTimestamp(10302);
    expect(timestamp).toMatch(/2:51:42/);

    timestamp = formatTimestamp(39905);
    expect(timestamp).toMatch(/11:05:05/);
  });
});
