import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  Typography,
  Descriptions,
  Skeleton,
  Tooltip,
  Alert
} from 'antd';

import { IconContext } from "react-icons";
import {
    RiInformationLine, RiQuestionLine, RiAccountCircleLine
} from 'react-icons/ri';

import RPC from '../../common/RPC';
import tooltipDescs from '../../common/TooltipDescriptions';

const { Title } = Typography;

const IssueTokensTx = props => {

    const tx = props.data;
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const getToken = async () => {
        setToken(null);
        setError(null);
        try {
            let params = {url: tx.origin};
            const response = await RPC.request("query", params);
            if (response && response.data) {
                setToken(response.data);
            } else {
                throw new Error("Token " + response.data.tokenUrl + " not found"); 
            }
        }
        catch(error) {
            setToken(null);
            setError(error.message);
        }
    }

    useEffect(() => {
        getToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>

            <Descriptions bordered column={1} size="middle">

                {tx.type ? (
                    <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.txType}><RiQuestionLine /></Tooltip></IconContext.Provider>Type</nobr></span>}>
                        {tx.type}
                    </Descriptions.Item>
                ) :
                    null
                }

            </Descriptions>
            
            {(tx && token) ? (
                <div>
                <Title level={4}>
                  <IconContext.Provider value={{ className: 'react-icons' }}>
                    <RiInformationLine />
                  </IconContext.Provider>
                  Transaction Info
                </Title>
                <Descriptions bordered column={1} size="middle">

                    {tx.txid ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.txId}><RiQuestionLine /></Tooltip></IconContext.Provider>Txid</nobr></span>}>
                            <span className="code">{tx.txid}</span>
                        </Descriptions.Item>
                    ) :
                        null
                    }

                    {(tx.data && tx.sponsor) ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.sponsor}><RiQuestionLine /></Tooltip></IconContext.Provider>Sponsor</nobr></span>}>
                            <Link to={'/acc/' + tx.sponsor.replace("acc://", "")}><IconContext.Provider value={{ className: 'react-icons' }}><RiAccountCircleLine /></IconContext.Provider>{tx.sponsor}</Link>
                        </Descriptions.Item>
                    ) :
                        null
                    }

                    {tx.data.recipient ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.txTo}><RiQuestionLine /></Tooltip></IconContext.Provider>Output</nobr></span>}>
                            <Link to={'/acc/' + tx.data.recipient.replace("acc://", "")}>
                                <IconContext.Provider value={{ className: 'react-icons' }}><RiAccountCircleLine /></IconContext.Provider>{tx.data.recipient}
                            </Link>
                        </Descriptions.Item>
                    ) :
                        null
                    }

                    {tx.data.amount ? (
                        <Descriptions.Item label={<span><nobr><IconContext.Provider value={{ className: 'react-icons' }}><Tooltip overlayClassName="explorer-tooltip" title={tooltipDescs.amount}><RiQuestionLine /></Tooltip></IconContext.Provider>Amount</nobr></span>}>
                            {(tx.data.amount/(10**token.precision)).toFixed(token.precision).replace(/\.?0+$/, "")} {token.symbol}
                       </Descriptions.Item>
                    ) :
                        null
                    }


                </Descriptions>
                </div>
            ) :
                <div>
                    {error ? (
                        <div className="skeleton-holder">
                            <Alert message={error} type="error" showIcon />
                        </div>
                    ) :
                        <div>
                            <Title level={4}>
                                <IconContext.Provider value={{ className: 'react-icons' }}>
                                <RiInformationLine />
                                </IconContext.Provider>
                                Transaction Info
                            </Title>
                            <div className="skeleton-holder">
                                <Skeleton active />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}

export default IssueTokensTx;
