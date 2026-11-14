import type { IArticle } from '@/types/article.types'
import type { IBlogCategory } from '@/types/blog-category.types'
import type { ICategory } from '@/types/category.types'
import type { IOrder } from '@/types/order.types'
import type { IProduct } from '@/types/product.types'
import type { IStore } from '@/types/store.types'

class PagesConfig {
	readonly home = '/'
	readonly blog = '/blog'
	readonly privacy = '/privacy'
	readonly legalTerms = '/legal-terms'
	readonly profile = '/profile'
	readonly admin = '/admin'
	readonly adminCategories = '/admin/categories'
	readonly adminCharacteristics = '/admin/characteristics'
	readonly adminArticles = '/admin/articles'
	readonly adminBlogCategories = '/admin/blog-categories'
	readonly favorites = '/wishlist'
	readonly myStores = '/profile/stores'
	readonly createStore = '/profile/stores/new'
	readonly search = '/search'
	readonly login = '/login'
	readonly register = '/register'
	readonly resetPassword = '/reset-password'
	readonly paymentResult = '/payment/result'

	getPaymentResult(orderId: IOrder['id']) {
		return `${this.paymentResult}?${new URLSearchParams({ orderId })}`
	}

	getArticle(slug: IArticle['slug']) {
		return `${this.blog}/${encodeURIComponent(slug)}`
	}

	getBlogCategory(slug: IBlogCategory['slug']) {
		return `${this.blog}/category/${encodeURIComponent(slug)}`
	}

	getSearch(query: string) {
		const params = new URLSearchParams({ query: query.trim() })

		return `${this.search}?${params}`
	}

	getCategoryProducts(slug: ICategory['slug']) {
		return `/categories/${encodeURIComponent(slug)}`
	}

	getStore(slug: IStore['slug']) {
		return `/stores/${encodeURIComponent(slug)}`
	}

	getProfileStore(slug: IStore['slug']) {
		return `${this.myStores}/${encodeURIComponent(slug)}`
	}

	getStoreProducts(slug: IStore['slug']) {
		return `${this.getProfileStore(slug)}/products`
	}

	getCreateStoreProduct(slug: IStore['slug']) {
		return `${this.getStoreProducts(slug)}/new`
	}

	getStoreSettings(slug: IStore['slug']) {
		return `${this.getProfileStore(slug)}/settings`
	}

	getProduct(slug: IProduct['slug']) {
		return `/products/${encodeURIComponent(slug)}`
	}

	getEditStoreProduct(
		storeSlug: IStore['slug'],
		productSlug: IProduct['slug']
	) {
		return `${this.getStoreProducts(storeSlug)}/${encodeURIComponent(productSlug)}/edit`
	}
}

export const pagesConfig = new PagesConfig()
