<?php

namespace App\Document\Embedded;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\EmbeddedDocument
 */
class Location
{
    /**
     * @ODM\Field(type="string")
     */
    private $type;

    /**
     * @ODM\Field(type="hash")
     */
    private $coordinates;

    public function getLocationType(): ?string
    {
        return $this->type;
    }
    public function setLocationType(string $type): self
    {
        $this->type = $type;
        return $this;
    }

    public function getCoordinates(): ?array
    {
        return $this->coordinates;
    }
    public function setCoordinates(array $coordinates): self
    {
        $this->coordinates = $coordinates;
        return $this;
    }
}
