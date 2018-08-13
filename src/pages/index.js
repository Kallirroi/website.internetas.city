import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import "../styles/index.css"
import {fragments} from '../templates/fragments'
import {sounds} from '../templates/sounds'

class BlogIndex extends React.Component {

  constructor(props) {
    super();
    this.handleMouseEnter=this.handleMouseEnter.bind(this);
    this.handleMouseLeave=this.handleMouseLeave.bind(this);
    this.onRef = ref => this.audioElement = ref;
  }

  handleMouseEnter = () => {
    this.audioElement.volume  = 0.3
    this.audioElement.play()
  };  

  handleMouseLeave = () => {
    // this.audioElement.stop()
    this.audioElement.pause()
  };

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
            const soundsLength = sounds.length;
            return (
              <div className="row" key={node.fields.slug}>
                <Link className="page" style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
                {fragments.map((d,i) =>  
                  <div key={i} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >
                    <audio ref={this.onRef}  >
                      <source src={sounds[Math.floor(Math.random() * soundsLength)].path} type="audio/mp3" />
                    </audio>
                    <img className="fragments" 
                    src={fragments[Math.floor(Math.random() * fragmentLength)].path}
                    />
                  </div>
                )}
              </div>
            )
          })}
          <a href="dat://internetasacity.hashbase.io/" className="footer">p2p version</a>
          <div className="App-Fallback">
            <div className="App-Fallback-Text">
              This visualization is not yet fully built for mobile screens.
            </div>
          </div>
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
