import type { IOrder } from '@/types/order.types'
import type { IProductQuery } from '@/types/product-query.types'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'
import type { IUser } from '@/types/user.types'

class QueryKeysConfig {
	readonly profile = ['profile'] as const
	readonly admin = ['admin'] as const
	readonly blogCategories = ['blog-categories'] as const

	getOrder(userId: IUser['id'] | undefined, orderId: IOrder['id']) {
		return ['orders', userId, orderId] as const
	}

	getBlogArticles(categorySlug?: string) {
		return ['articles', categorySlug] as const
	}

	getAdminList(resource: string, scope = '') {
		return [...this.admin, resource, scope] as const
	}
	readonly sessions = ['sessions'] as const
	readonly categories = ['categories'] as const
	readonly catalogCategories = [...this.categories, 'catalog'] as const
	readonly myStores = ['my-stores'] as const
	readonly profileStores = ['profile-store'] as const
	readonly storeProducts = ['store-products'] as const
	readonly productCategories = ['categories', 'product-form'] as const

	getCart(userId: string | undefined) {
		return ['cart', userId] as const
	}

	getCartProduct(slug: string) {
		return ['cart-product', slug] as const
	}

	getFavoriteMutation(userId: string | undefined, productId: string) {
		return ['favorites', userId, productId] as const
	}

	getCategoryDetails(slug: string) {
		return ['category', slug] as const
	}

	getProductDetails(slug: string) {
		return ['product', slug] as const
	}

	getMyProductRating(
		productId: IProduct['id'],
		userId: IUser['id'] | undefined
	) {
		return ['product-rating', productId, userId] as const
	}

	getProfileStore(slug: IStore['slug']) {
		return [...this.profileStores, slug] as const
	}

	getCatalog(query: IProductQuery) {
		return ['products', 'catalog', query] as const
	}

	getSearchFilters(search: string, categorySlug?: string) {
		return ['products', 'filters', search, categorySlug] as const
	}

	getHomeProducts(categorySlug?: string) {
		return ['products', 'home', categorySlug] as const
	}

	getStoreProducts(slug: IStore['slug']) {
		return [...this.storeProducts, slug] as const
	}

	getPublicStoreProducts(slug: IStore['slug']) {
		return ['products', 'store', slug] as const
	}
}

export const queryKeysConfig = new QueryKeysConfig()
