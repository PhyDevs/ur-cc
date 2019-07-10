<?php

namespace App\Document;

use App\Document\Embedded\Location;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\Document(collection="shops")
 */
class Shop 
{
    /**
     * @ODM\Id
     */
    private $_id;

    /**
     * @ODM\Field(type="string")
     */
    private $picture;

    /**
     * @ODM\Field(type="string")
     */
    private $name;

    /**
     * @ODM\Field(type="string")
     */
    private $email;

    /**
     * @ODM\Field(type="string")
     */
    private $city;

    /**
     * @ODM\EmbedOne(targetDocument="App\Document\Embedded\Location")
     */
    private $location;


    public function getId(): string
    {
        return $this->_id;
    }
    public function setId(string $id): self
    {
        $this->_id = $id;
        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }
    public function setPicture(string $picture): self
    {
        $this->picture = $picture;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }
    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }
    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }
    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }
    public function setLocation(Location $location): self
    {
        $this->location = $location;
        return $this;
    }
}
