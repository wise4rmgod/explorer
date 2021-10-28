import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Alert, Typography } from 'antd';

import Stats from './../common/Stats';

const { Paragraph } = Typography;

const Blocks = () => {

  useEffect(() => {
    document.title = "Blocks | Accumulate Explorer";
  }, []);

  return (
    <div>

      <div className="stats">
        <Stats />
      </div>

      <Paragraph>
        <Alert message="This is the explorer of Testnet Accumulate Network" type="info" showIcon />
      </Paragraph>

      <Paragraph>
        Use <Link to={'/faucet'}><strong>faucet</strong></Link> to get some testnet <Link to={'/tokens/ACME'}><strong>ACME</strong></Link> tokens.
      </Paragraph>

    </div>
  );
}

export default Blocks;
