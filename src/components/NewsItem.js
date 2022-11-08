import React, { Component } from 'react';

// a7d758e3ac384ceebc1828b9abace29d



export class NewsItem extends Component {
    
      render() {
        let {title,desc,imageUrl,url,author,date} = this.props;
        return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toDateString()}</small></p>
                <a href={url} className="btn btn-sm btn-primary">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem