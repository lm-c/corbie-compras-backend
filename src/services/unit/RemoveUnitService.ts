import prismaClient from '../../prisma';

interface UnitRequest {
  id: number;
}

class RemoveUnitService {
  async execute({ id }: UnitRequest) {
    const count = await prismaClient.task.count({ where: { unit_id: id } });
    if (count > 0)
      return {
        msg: 'Informamos que esta unidade já foi utilizada em uma compra realizada em nossa plataforma',
      };

    const result = await prismaClient.unit.delete({
      where: { id: id },
    });
    return result;
  }
}

export { RemoveUnitService };
