import React, {Component} from 'react'

import PublicViewComponent from './PublicComponent/PublicViewComponent'

export default class PublicStatisticContainer extends Component{

    render() {
        return (
                <section>
                    <PublicViewComponent />
                </section>
        )
    }
}