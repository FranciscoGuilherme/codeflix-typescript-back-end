import UniqueEntityId from "@seedwork/domain/unique-entity-id.vo";
import InvalidUuidError from "@seedwork/errors/invalid-uuid.error";

describe("Unit tests for ID value object", (): void => {
  it("should throw an error when try to validade an invalid ID", (): void => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect((): void => {
      new UniqueEntityId("fake ID");
    }).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled();
  });
});
