import { validate as uuidValidate } from "uuid";
import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";
import InvalidUuidError from "@seedwork/errors/invalid-uuid.error";

describe("Unit tests for ID value object", (): void => {
  let validateSpy: jest.SpyInstance;

  beforeEach((): void => {
    validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
  });

  it("should throw an error when try to validade an invalid ID", (): void => {
    expect((): void => {
      new UniqueEntityId("fake ID");
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toBeCalledTimes(1);
  });

  it("should accept a uuid passed in constructor", (): void => {
    const uuid: string = "d514f098-f08f-4b3f-bad6-54e3e633c875";
    const valueObject: UniqueEntityId = new UniqueEntityId(uuid);

    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toBeCalledTimes(1);
  });

  it("should create a valid uuid", (): void => {
    const valueObject: UniqueEntityId = new UniqueEntityId();

    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toBeCalledTimes(1);
    expect(uuidValidate(valueObject.value)).toBeTruthy();
  });
});
