<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ViewController extends AbstractController
{
    /**
     * @Route("/{reactRoute}", name="main", defaults={"reactRoute": null}, requirements={"reactRoute"=".+"})
     */
    public function index()
    {
        return $this->render('index/index.html.twig');
    }
}
