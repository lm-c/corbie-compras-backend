import prismaClient from '../../prisma';

interface TaskRequest {
  description: string;
  qty: number;
  sector_id: number;
  unit_id: number;
  user_id: number;
}
class CreateTaskService {
  async execute({
    description,
    qty,
    sector_id,
    unit_id,
    user_id,
  }: TaskRequest) {
    if (qty < 1) throw new Error('Quantidade inválida!');
    if (description === '') throw new Error('Descrição inválida!');
    if (sector_id < 1) throw new Error('Setor inválido!');
    if (unit_id < 1) throw new Error('Unidade inválida!');

    const result = await prismaClient.task.create({
      data: {
        qty: qty,
        description: description,
        sector_id: sector_id,
        unit_id: unit_id,
        user_id: user_id,
      },
      select: { id: true, description: true, qty: true },
    });

    return result;
  }
}

export { CreateTaskService };
