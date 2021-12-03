import React, { useState, useEffect } from 'react';

import {
  Typography, Alert, Skeleton
} from 'antd';

import RPC from './../common/RPC';
import SyntheticTx from './Tx/SyntheticTx';
import FaucetTx from './Tx/FaucetTx';
import TokenTx from './Tx/TokenTx';

const { Title } = Typography;

const Tx = ({ match }) => {

    const [tx, setTx] = useState(null);
    const [error, setError] = useState(null);

    const getTx = async (hash) => {
        document.title = "Transaction " + hash + " | Accumulate Explorer";
        setTx(null);
        setError(null);
        try {

            let params = {txid: hash};
            const response = await RPC.request("query-tx", params);
            if (response && response.data) {
                if (response.type === "syntheticTokenDeposit") {
                    let to = {url: response.data.to, amount: response.data.amount, txid: response.data.txid};
                    response.data.to = [];
                    response.data.to.push(to);
                }
                setTx(response);
            } else {
                throw new Error("Transaction " + hash + " not found"); 
            }

        }
        catch(error) {
            setTx(null);
            setError(error.message);
        }
    }

    function Render(props) {
        if (props.data) {
            switch(props.data.type) {
                case 'acmeFaucet':
                    return <FaucetTx data={props.data} />;
                case 'syntheticDepositTokens':
                    return <SyntheticTx data={props.data} />;
                case 'withdrawTokens':
                    return <TokenTx data={props.data} />;
                default:
                    return <Alert message="This chain type is not supported by the explorer yet" type="warning" showIcon />
            }
        }
        return <Alert message="Chain does not exist" type="error" showIcon />
    }

    useEffect(() => {
        getTx(match.params.hash);
    }, [match.params.hash]);

    return (
        <div>
            <Title level={2}>Transaction</Title>
            <Title level={4} type="secondary" style={{ marginTop: "-10px" }} className="break-all" copyable>{match.params.hash}</Title>
                {tx ? (
                    <Render data={tx} />
                ) :
                    <div>
                        {error ? (
                            <div className="skeleton-holder">
                                <Alert message={error} type="error" showIcon />
                            </div>
                        ) :
                            <div className="skeleton-holder">
                                <Skeleton active />
                            </div>
                        }
                    </div>
                }
        </div>
    );
}

export default Tx;