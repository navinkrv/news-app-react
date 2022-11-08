import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  article = {
    status: "ok",
    totalResults: 36,
    articles: [],
  };

  constructor() {
    super();
    console.log("this is a constructor");
    this.state = {
      articles: this.article.articles,
      pageno: 1,
      data: {},
      loading: false,
    };
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7d758e3ac384ceebc1828b9abace29d&page=${this.state.pageno}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);

    this.setState({
      articles: parsedData.articles,   
      data:parsedData
    });
  }

  componentDidMount() {
    this.updateNews();
  }


  fetchMoreData =async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a7d758e3ac384ceebc1828b9abace29d&page=${this.state.pageno}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),   
      data:parsedData,
      pageno:this.state.pageno+1
    });
  };

  render() {
    return (
      <div>
        <h1 className="text-center">News Wala App</h1>
        <hr />
        {/* {this.state.loading && <Spinner />} */}


        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div key={element.url} className="col-md-4 my-2">
                  <NewsItem
                    title={
                      element.title ? element.title.slice(0, 45) + "..." : ""
                    }
                    desc={
                      element.description
                        ? element.description.slice(0, 80) + "..."
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASkAAACpCAMAAABAgDvcAAAAWlBMVEXh5urDzdba3+LFz9nf5+rEz9HBy8/S3d/CytHJztHBzNLL19ji6e3R193g5enCzNbGys7O1t7Z4OPa4ejS2t/J0tXV3eXU2dze5u3N0tXa5O69yNHZ4+XF0dKFwnRbAAAC4klEQVR4nO3c63KqMBRAYYLIQY3BCy1yaN//NQ83EQjqHi/TM93r+9GZxtYZ1wRMwDYIAAAAAAAAAAAAAAAAAAAAAAAAADzKRe/ifvqlvVi4fJfwp1/ai4XmXShFKUrdRikpSklRSopSUpSSopTUoFSaPC/VUSp8no5Sixc83YJSQpSSopQUpWa5wAZRVH25oNSVXy52cbwrwksrSs3al93ywvRXgik1w636dWayO3SDlPJZM1hlmqQbpZTHZokZltq2w4pLuWD+FZ8WwylVza9TM6y51CE+zo6no1LGtD+luJRdrhdz9ziP5TiUyZphxaWytTEfkT9+8Eo1iyrFperzdrzxx4/lJJXqOVXtVvbNI0lup49Fy/W4VHuIKi3VH2PpzjtV2c2oVLpQ/t636t/gpqmcG6+nui5aS+WXGitvVmXlYJ3QLTy1lnKDFOU+mJyrbH4+8tKkOA8qLVUMVpdpkgfjaeWCo0nqSZeaz35QZ6mveLxh+fTeAIMwL4p8mERnqY/JOsD42xrv5KWyVG48p7tPp6+UC06JFyrd+8ffhL5Sl0u/Q+vNzA5wRGGpMPVDVamyO0+nsNRqLtRlLe5x7QPqStlsdkrVZq/rBce0XaWrKxUmV0v525pKkZQ6S0Wba52qbc102eXs32pY6Zw6LK+XMmUxXiu4bTP/dJa60alONdrWhKZdTqgslfmLzqHUHPpUUXY+o2ksdbx6Nj9bdgtQ+/XdjyksZYu7peLmbo2z2TLWXCq8few1mm2N2w+TKiwlCFVvayYfTFBYKpveRr+S6jseD+grtZV0qlNNvqeUFKUo1aGUFKWkKCVFKSlKSfmlRAtPj74reXa7fsxW3acXD5vHtH/loKiUs49q7kQoKvUkSklRSopSUipKpeXqeYNPyf7eUq9GKUpR6jZKSVFKilJSlJKilBSlpML4XX5bKffnXX7bf/0GAAAAAAAAAAAAAAAAAAAAAAAA8D/6B0YsNs6SxFarAAAAAElFTkSuQmCC"
                    }
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
       
      </div>
    );
  }
}

export default News;
