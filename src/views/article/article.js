import React from 'react';
import './article.less'
import { EditTwoTone } from '@ant-design/icons';

export default class Article extends React.Component {
    constructor(prop) {
        super(prop)
    }
    render() {
        return (
            <div className='content article_wrapper'>
                <div className='top_row row-flex-end'>
                    <EditTwoTone style={{ fontSize: '18px'}} />
                </div>
                <div className='bottom_wrapper'>

                </div>

            </div>
        )
    }
}