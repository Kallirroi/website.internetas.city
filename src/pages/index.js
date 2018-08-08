import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import "../styles/index.css";
import {fragments} from './fragments';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    
    return (
        <div className="index">
          <Helmet title={siteTitle} />
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            const tag = get(node, 'frontmatter.tag') || node.fields.slug
            const fragmentLength = fragments.length;
            return (
              <div className="row" key={node.fields.slug}>
                <Link className="page" style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
                {fragments.map((d,i) =>  <img className="fragments" key={i} src={fragments[Math.floor(Math.random() * fragmentLength)].path}/>) }
              </div>
            )
          })}
        </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`
