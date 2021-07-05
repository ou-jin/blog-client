module.exports = {
    presets:[
        ["@babel/preset-env"],
        ["@babel/preset-react",{
            "runtime": "automatic"
        }]
    ],
    ignore:[
        "react-router-dom.js",
        "react-dom.js",
        "react.js",
        "webpack-dev-server.js",
        "webpack.js",
        "react-responsive.js"
      ]
    
 
}