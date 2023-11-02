import fetch from 'node-fetch';

export default class BitbucketAPI {
  #apiToken = '';

  constructor(apiToken, repoName) {
    // TODO: params validation
    this.#apiToken = apiToken;
    this.repoName = repoName;
  }

  async createPullRequest(branch, baseBranch, title) {
    const body = {
      title,
      source: {
        branch: {
          name: branch,
        },
      },
      destination: {
        branch: {
          name: baseBranch,
        },
      },
    };
    const bodyData = JSON.stringify(body);

    const response = await fetch(`https://api.bitbucket.org/2.0/repositories/${this.repoName}/pullrequests`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.#apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: bodyData,
    }).catch((err) => {
      console.error(err);
      throw err;
    });

    console.log(`Response: ${response.status} ${response.statusText}`);

    return response.text();
  }
}
