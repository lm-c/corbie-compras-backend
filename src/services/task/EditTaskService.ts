import prismaClient from '../../prisma';

interface TaskRequest {
  id: number;
  description: string;
  qty: number;
  sector_id: number;
  unit_id: number;
}

class EditTaskService {
  async execute({ id, description, qty, sector_id, unit_id }: TaskRequest) {
    const result = await prismaClient.task.update({
      where: { id: id },
      data: {
        description: description,
        qty: qty,
        sector_id: sector_id,
        unit_id: unit_id,
        updated_at: new Date(),
      },
    });
    return result;
  }
}

export { EditTaskService };
