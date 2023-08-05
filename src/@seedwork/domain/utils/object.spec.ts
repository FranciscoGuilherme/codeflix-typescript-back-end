import { deepFreeze } from "@seedwork/domain/utils/object";

describe("Unit tests for objects", (): void => {
  it("should not freeze a scalar value", (): void => {
    type ValueListProperties = { value: any, type: string };
    const valueList: ValueListProperties[] = [
      { value: 0, type: "number" },
      { value: true, type: "boolean" },
      { value: false, type: "boolean" },
      { value: "false", type: "string" }
    ];

    valueList.forEach((item: ValueListProperties): void => {
      const value: any = deepFreeze(item.value);
      expect(typeof value).toBe(item.type);
    });
  });

  it("should freeze a object to become an immutable object", (): void => {
    const value: any = deepFreeze({
      prop: "value",
      nested: {
        prop: "test",
        data: new Date()
      }
    });

    expect(typeof value).toBe("object");
    expect(value.nested.data).toBeInstanceOf(Date);
    expect((): void => { value.prop = ""; }).toThrowError();
    expect((): void => {
      value.value.nested.prop = "change";
    }).toThrowError();
  });
});
