import prismaClient from '../../prisma';

interface TaskRequest {
  id: number;
}

class RemoveTaskService {
  async execute({ id }: TaskRequest) {
    const result = await prismaClient.task.delete({
      where: { id: id },
    });
    return result;
  }
}

export { RemoveTaskService };
