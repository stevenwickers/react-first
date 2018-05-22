import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import bodyParser from 'body-parser';


const port = 7000;
const app = express();
const compiler = webpack(config);



/*** Body Parser for parsing ***/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));



app.get('/', function(req, res) {
    //const initialContent = serverRender();

    res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));


app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('listening on port: ' + port);

        open(`http://localhost:${port}`);

    }
});
