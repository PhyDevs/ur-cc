<?php

namespace App\Controller;

use App\Document\Shop;
use Doctrine\ODM\MongoDB\DocumentManager;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Response;

/**
 * @Rest\Route(path="/api")
 */
class ShopController extends AbstractFOSRestController
{

    private $dm;
    private $shopRepository;

    public function __construct(DocumentManager $documentManager)
    {
        $this->dm = $documentManager;
        $this->shopRepository = $this->dm->getRepository(Shop::class);
    }

    /**
     * @Rest\Get(path="/shops", name="shops")
     * @Rest\View(statusCode=200)
     */
    public function getShops()
    {
        $shops = $this->shopRepository->findAll();
        return $shops;
    }

    /**
     * @Rest\Get(path="/shops/nearby", name="nearby.shops")
     * @Rest\View(statusCode=200)
     */
    public function getNearbyShops()
    {
        $user = $this->getUser();
        $nearbyShops = $this->shopRepository->findNearbyShops($user);

        return $nearbyShops;
    }

    /**
     * @Rest\Get(path="/shops/preferred", name="preferred.shops")
     * @Rest\View(statusCode=200)
     */
    public function getPreferredShops()
    {
        $user = $this->getUser();
        $preferred_shops = $user->getPreferredShops();

        return $preferred_shops;
    }

    /**
     * @Rest\Patch(
     *		path="/shops/{id}/like",
     *		name="like.shop"
     *	)
     * @Rest\View(statusCode=200)
     */
    public function likeShop($id)
    {
        $user = $this->getUser();
        $shop = $this->shopRepository->find($id);
        if($shop == null) {
            return $this->view(null, Response::HTTP_NOT_FOUND);
        }

        $user->addShop($shop);
        $this->dm->flush();

        return ['liked' => true];
    }

    /**
     * @Rest\Patch(
     *      path="/shops/{id}/remove",
     *      name="remove.shop"
     *  )
     * @Rest\View(statusCode=200)
     */
    public function removeShop($id)
    {
        $user = $this->getUser();
        $shop = $this->shopRepository->find($id);
        if($shop == null) {
            return $this->view(null, Response::HTTP_NOT_FOUND);
        }

        $user->removeShop($shop);
        $this->dm->flush();

        return ['removed' => true];
    }
}
