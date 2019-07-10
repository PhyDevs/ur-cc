<?php

namespace App\Repository;

use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentRepository;

class ShopRepository extends DocumentRepository
{

    public function findNearbyShops(User $user)
    {
        $preferredShops = $user->getPreferredShops()->toArray();
        $preferredShopsIds = array();

        foreach($preferredShops as $shop){
            $preferredShopsIds[] = $shop->getId();
        }

        $qb = $this->createQueryBuilder();
        $query = $qb
            ->field('_id')
            ->notIn($preferredShopsIds)
            ->getQuery();
        $shops = $query->execute();

        return $shops->toArray();
    }
}
