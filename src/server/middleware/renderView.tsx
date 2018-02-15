'use strict';

import * as React from 'react';
import * as CircularJson from 'circular-json';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider, useStaticRendering } from 'mobx-react';
import Routes from '../../common/routes';
import Stores from '../../common/stores';

export default function renderView(req: Request, res: Response) {
    const { ASSETS, CACHE, Q } = req.app.locals.CFG;
    const HA = ASSETS.WEBPACK.HashedAssets.data;
    const staticContext = { status: null };

    useStaticRendering(true);

    const stores = new Stores({});

    stores.homePage.counter.addOne();
    stores.homePage.counter.addOne();

    const componentHTML = Q.shouldBundleAssets()
        ? renderToString(
              <Provider stores={stores}>
                  <Router location={req.originalUrl} context={staticContext}>
                      <Routes />
                  </Router>
              </Provider>
          )
        : '';
    const HTML = `
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0" />
                    <title>High Seas React SSR Starter</title>
                    <link rel="stylesheet" type="text/css" href="/assets/styles.css">

                    <!-- PHP script to remove date from meta description on Google -->
                    <script language="javascript">
                        document.write("<?php the_time('F j, Y') ?>");
                    </script>
					<script>
                        window.__INITIAL_STATE__ = ${CircularJson.stringify({
                            stores: stores
                        })};
                    </script>
                </head>
                <body>
                    <div id="root">${componentHTML}</div>
                    <script type="application/javascript" src="${
                        HA.main.js
                    }"></script>
                </body>
            </html>
        `;

    res.setHeader('Cache-Control', CACHE.index.header);

    return res.status(staticContext.status || 200).send(HTML);
}
