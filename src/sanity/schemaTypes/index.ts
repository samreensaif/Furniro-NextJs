import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'

import { comment } from './comment/comment'


import { ourProducts } from './landindPage-sections/ourProducts'
import { mainBox } from './pc-section/mainBox'
import { pC } from './pc-section/pc'
import { relatedProduct } from './relatedProduct-section/relatedProduct'
import { relatedProductSection } from './relatedProduct-section/relatedProductSection'

import { landingPage } from './landindPage-sections/landingPage'
import { hero } from './landindPage-sections/hero'
import { blogPage } from './blogPage-sections/blogPage'
import { blogMain } from './blogPage-sections/blogMain'
import { category } from './blogPage-sections/category'
import { relatedPost } from './blogPage-sections/relatedPost'
import { browseSection } from './landindPage-sections/browseSection'
import { funiroSection } from './landindPage-sections/funiroSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPage,blogMain,category,relatedPost,product,comment,landingPage,hero,browseSection,funiroSection,ourProducts,mainBox,pC,relatedProduct,relatedProductSection],
}
