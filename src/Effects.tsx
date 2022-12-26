import { Component } from 'react';
import { subscribe, unsubscribe } from './resources/API';

interface IProps {
    sourceId: string;
}
interface IState {
    message: number;
}

export class Effects extends Component<IProps, IState> {
    props: IProps;
    state: IState;
    _callback: (ms: number) => void;
    constructor(props: { sourceId: string }) {
        super(props);
        this.props = props;
        this.state = { message: -1 };
        this._callback = this.callback.bind(this);
    }
    componentDidMount(): void {
        subscribe(this.props.sourceId, this._callback);
    }
    componentDidUpdate(
        prevProps: Readonly<IProps>,
        prevState: Readonly<IState>,
    ): void {
        if (prevProps.sourceId !== this.props.sourceId) {
            unsubscribe(prevProps.sourceId, this._callback);
            subscribe(this.props.sourceId, this._callback);
            this.setState({ message: -1 });
        }
    }
    componentWillUnmount(): void {
        unsubscribe(this.props.sourceId, this._callback);
    }
    callback(ms: number) {
        this.setState({ message: ms });
    }
    render() {
        return (
            <div>
                {this.props.sourceId}: {this.state.message}
            </div>
        );
    }
}
