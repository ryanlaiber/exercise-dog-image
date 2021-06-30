import React from 'react';

class Main extends React.Component {
    render() {
        const { imgPath } = this.props;
        return (
            <div>
                <img id="casorro" src={imgPath} alt='dog' />
            </div>
        );
    }
}

export default Main;