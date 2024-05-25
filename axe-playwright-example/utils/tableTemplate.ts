export const tableTemplate = `
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Axe results</title>
        <style>
            .tag {
                display: inline-flex;
                padding: 4px;
                margin: 4px;
                background-color: #c7b2b1;
                border-radius: 12px;
            }
            .target {
                display: block;
                margin: 2px 1px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                padding: 8px;
                text-align: left;
                border: 1px solid #ddd;
            }
            th {
                background-color: #f2f2f2;
                text-align: center;
            }
            
            .critical {
                background-color: #da1e28;
                color: #ffffff;
            }
            
            .serious {
                background-color: #ff832b;
            }
            
            .moderate {
                background-color: #f1c21b;
            }
            
            .minor {
                background-color: #add8e6;
            }
        </style>
    </head>
    <body>
        <section>
        <h3>Found violations:</h3>
        {{#each data}}
            <h4 class='violation-header'>
                <span class="tag {{this.impact}}">
                        {{this.impact}}
                </span>
                <a href={{this.helpUrl}} target="_blank" rel="noreferrer noopener">{{this.id}}</a> 
            </h4>
            <p>{{this.description}}</p>
            <p>{{this.help}}</p>
            <p>
                {{#each this.tags}}
                    <span class="tag">{{this}}</span>
                {{/each}}  
            </p>
            <table>
            <tr><th>Id</th><th>Locator</th><th>Message</th></tr>
             {{#each this.nodes}}
            <tr>
                <td>{{incrementIndex}}</td>
                <td>
                    {{#each this.target}}
                        <span class="target">{{this}}</span>
                    {{/each}}  
                </td>
                <td>{{this.failureSummary}}</td></tr>
            {{/each}}  
            </table>
        {{/each}}
        </section>
    </body>
</html>
`;