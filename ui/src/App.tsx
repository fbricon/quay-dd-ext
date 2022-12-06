import React from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Box, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<any[]>([]);
  const [queryString, setQueryString] = React.useState<string>();
  const ddClient = useDockerDesktopClient();

  function openInBrowser(url: string): void {
    ddClient.host.openExternal(url);
  }

  const fetchAndDisplayResponse = async () => {
    const result = await fetch(`https://quay.io/api/v1/find/repositories?query=${queryString}&page=1&includeUsage=true`, {
      headers: {
        'X-Requested-With':'XMLHttpRequest'
      }
    });
    const content = (await result.json())?.results as any[];
    setResponse(content);
  };

  return (
    <>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Search for images on <a href="" onClick={() => openInBrowser(`https://quay.io`)}>quay.io</a>
      </Typography>
      <Box margin="15px 0px 15px 0px" display="flex" flexDirection="row">
        <TextField style={{ flex: '1 1 auto' }} variant='outlined' value={queryString ?? ''} onChange={e => setQueryString(e.target.value)}/>
        <Button variant="contained" onClick={fetchAndDisplayResponse}>
          Search image
        </Button>
      </Box>
        <div>
        { response.map( (image) => ( 
          <Card style={{margin: 5}}>
            <CardHeader title={
            <>
            <a href="#" onClick={() => openInBrowser(`https://quay.io${image.href}`)}>{image.name}</a>
            <Button variant="contained" onClick={() => openInBrowser(`https://quay.io${image.href}`)} style={{float: 'right'}}>
              Pull image
            </Button>
            </>
          } ></CardHeader>
            <CardContent>
              <img src={`https://www.gravatar.com/avatar/${image?.namespace?.avatar?.hash}`} style={{float: 'left', margin: 10}} />
              <Box><span>{image.description}</span></Box>
            </CardContent>
          </Card>
        ))}
          {/* <TextField
            label={`Quay.io response for ${queryString}`}
            sx={{ width: 480 }}
            disabled
            multiline
            variant="outlined"
            minRows={5}
            value={response ?? ''}
            /> */}
          </div>
    </>
  );
}
