import React from 'react';

class HomeContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return(
            <div>
                <h1>React First - A Starter Application</h1>
                <p><h2>React First Application is the easiest way to quickly get
                    a React / Redux application started.</h2>
                </p>
                <p>This application has the minimum required npm packages
                    to get you up and running quickly. This application uses
                    Babel and Webpack.
                </p>
                <p><h1>Other Project</h1></p>
                <p><h2>Movie Application</h2></p>
                <p>Download the
                    <a href='https://github.com/stevenwickers/movie-app' target='_new'> movie-app</a> to learn React and Redux</p>

                <p><h2>GraVy</h2></p>
                <p>A coding pattern for React / Redux
                    <a href='https://github.com/stevenwickers/gravy-app' target='_new'>gravy-app</a></p>

                <p><h2>Contact Me</h2></p>
                <p>Please email me if you have any questions @ <a href='mailto:stevenwickersgravy@gmail.com' target='_new'>Steven Wickers</a> </p>

            </div>
        )
    }
}

export default HomeContainer;