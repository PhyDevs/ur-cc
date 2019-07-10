<?php

namespace App\Document;

use Doctrine\Bundle\MongoDBBundle\Validator\Constraints\Unique;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use JMS\Serializer\Annotation\Type;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ODM\Document(collection="users")
 * @Unique(fields="email")
 */
class User implements UserInterface
{
    /**
     * @ODM\Id
     */
    private $id;

    /**
     * @Type("string")
     *
     * @ODM\Field(type="string")
     * @Assert\NotBlank(message = "Email address is required")
     * @Assert\Email(message = "The email is not a valid")
     */
    private $email;

    /**
     * @Type("string")
     *
     * @ODM\Field(type="string")
     * @Assert\NotBlank(message="Password is required")
     * @Assert\Length(
     *     min = 4,
     *     minMessage="The password should have least 4 characters",
     * )
     */
    private $password;

    /**
     * @ODM\Field(type="hash")
     */
    private $roles = [];


    public function getId(): string
    {
        return $this->id;
    }
    public function setId(string $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getPassword(): string
    {
        return (string) $this->password;
    }
    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    /**
     * A visual identifier that represents this user.
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    public function getRoles()
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function getSalt()
    {
        // not needed when using the "bcrypt"
    }

    public function eraseCredentials() { }
}
