<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="api_todo")
 */
class TodoController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var TaskRepository
     */
    private $taskRepository;

    public function __construct(EntityManagerInterface $entityManager, TaskRepository $taskRepository)
    {
        $this->entityManager = $entityManager;
        $this->taskRepository = $taskRepository;
    }

    /**
     * @Route("/read", name="api_todo_read")
     */
    public function index(): Response
    {
        $todos = $this->taskRepository->findAll();
        $array = [];

        foreach ($todos as $todo) {
            $array[] = $todo->toArray();
        }
        return $this->json($array);
    }

    /**
     * @Route("/create", name="api_todo_create")
     * @param Request $request
     * @return JsonResponse
     */
    public function createTask(Request $request)
    {
        $content = json_decode($request->getContent());
        $task = new Task();

        $task->setTask($content->task);

        try {
            $this->entityManager->persist($task);
            $this->entityManager->flush();
            return $this->json([
                $task->toArray(),
            ]);
        } catch (Exception $exception) {
            //error
        }
    }

    /**
     * @Route("/update/{id}", name="api_todo_create")
     * @param Request $request
     * @param Task $task
     * @return JsonResponse
     */
    public function updateTask(Request $request, Task $task)
    {
        $content = json_decode($request->getContent());
        $task->setTask($content->task);
        try {
            $this->entityManager->flush();
        } catch (Exception$exception) {
//            error
        }

        return $this->json([
            'message' => 'Task has been updated!'
        ]);
    }
}
