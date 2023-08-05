import Chance from "chance";
import Entity from "@seedwork/domain/entity/entity";
import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";

type StubProperties = {
  prop: string;
  nested: {
    prop: number;
    optional?: string;
  }
};

class StubEntity extends Entity<StubProperties> {
  constructor(public readonly props: StubProperties, id?: UniqueEntityId) {
    super(props, id);
  }
}

describe("Unit tests for entity abstraction", (): void => {
  let uuid: string;
  let chance: Chance.Chance;
  const props: StubProperties = {
    prop: "prop",
    nested: {
      prop: 10
    }
  };

  beforeEach((): void => {
    chance = new Chance();
    uuid = chance.guid({ version: 4 });
  });

  it("should set props and id", (): void => {
    const id: UniqueEntityId = new UniqueEntityId(uuid);
    const entity: StubEntity = new StubEntity(props, id);

    expect(entity.id).toBe(uuid);
    expect(entity.props).toStrictEqual(props);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });

  it("should be able to generate JSON", (): void => {
    const id: UniqueEntityId = new UniqueEntityId(uuid);
    const entity: StubEntity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id: id.value,
      ...props
    });
  });
});
