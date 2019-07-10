<?php

namespace App\Controller;

use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Validator\ConstraintViolationListInterface;

/**
 * @Rest\Route(path="/api")
 */
class AuthenticationController extends AbstractFOSRestController
{

    private $JWTManager;
    private $encoder;
    private $dm;

    // DI injecting services to the controller
    public function __construct(
        DocumentManager $documentManager,
        JWTTokenManagerInterface $JWTManager,
        UserPasswordEncoderInterface $encoder
    )
    {
        $this->dm = $documentManager;
        $this->JWTManager = $JWTManager;
        $this->encoder = $encoder;
    }

    /**
     * @Rest\Post(path="/login_check", name="login_check")
     */
    public function login()
    {
        // handled by Lexik JWT Bundle
        throw new \DomainException('You should never see this');
    }

    /**
     * @Rest\Post(path="/register", name="register")
     * @Rest\View
     * @ParamConverter("user", converter="fos_rest.request_body")
     */
    public function register(User $user, ConstraintViolationListInterface $violations)
    {
        if (count($violations) > 0) {
            return $this->view($violations, Response::HTTP_BAD_REQUEST);
        }

        // Encrypting the user's password
        $password = $this->encoder->encodePassword($user, $user->getPassword());
        $user->setPassword($password);

        $this->dm->persist($user);
        $this->dm->flush();

        $token = $this->JWTManager->create($user);
        return $this->view(['token' => $token, 'user' => $user], Response::HTTP_CREATED);
    }
}
