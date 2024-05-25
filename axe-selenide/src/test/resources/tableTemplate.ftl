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
    <#list data as violation>
        <h4 class='violation-header'>
                <span class="tag ${violation.impact}">
                        ${violation.impact}
                </span>
            <a href="${violation.helpUrl}" target="_blank" rel="noreferrer noopener">${violation.id}</a>
        </h4>
        <p>${violation.description}</p>
        <p>${violation.help}</p>
        <p>
            <#list violation.tags as tag>
                <span class="tag">${tag}</span>
            </#list>
        </p>
        <table>
            <tr>
                <th>Id</th>
                <th>Locator</th>
                <th>Message</th>
            </tr>
            <#list violation.nodes as node>
                <tr>
                    <td>${incrementIndex()}</td>
                    <td>
                        <#list node.target as target>
                            <span class="target">${target}</span>
                        </#list>
                    </td>
                    <td>${node.failureSummary}</td>
                </tr>
            </#list>
        </table>
    </#list>
</section>
</body>
</html>