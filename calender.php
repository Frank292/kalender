<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="calender.css">
    <link rel="php" href="calender.php">
    <meta charset="UTF-8">
    <title>Kalender</title>
</head>

<body> 
    <h1>Kalenderblatt vom 17.03.2022</h1>
    <div class="calender">
        <div>
            <h2 id="chooseMonth">
                <ul>
                    <li class="selectable navigationButton">◄</li>
                    <li class="selectable navigationButton">month</li>
                    <li class="selectable navigationButton">►</li>
                </ul>
            </h2>
            <h2 id="chooseYear">
                <ul>
                    <li class="selectable navigationButton">►</li>
                    <li class="selectable navigationButton">yyyy</li>
                    <li class="selectable navigationButton">◄</li>
                </ul>
            </h2>
        </div>
        <table>
            <tr>
                <th>KW</th>
                <th>Mo</th>
                <th>Di</th>
                <th>Mi</th>
                <th>Do</th>
                <th>Fr</th>
                <th>Sa</th>
                <th>So</th>
            </tr>
            <tr>
                <td class="kw"></td>
            </tr>
        </table>
    </div>
    <div id="info">
        <p></p>
    </div>
    <div id="history">
        <h3></h3>
        <ul></ul>
    </div>
    <footer></footer>
    </div>
    <script type="text/javascript" src="calender.js"> </script>

</body>