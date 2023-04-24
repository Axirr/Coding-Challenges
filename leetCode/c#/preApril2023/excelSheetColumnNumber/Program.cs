using System;
using System.Diagnostics;
class Program {
    public static void Main() {
        Solution sol = new Solution();
        string columnTitle;
        int colNum;
        
        columnTitle = "A";
        colNum = sol.TitleToNumber(columnTitle);
        Console.WriteLine(colNum);
        Debug.Assert(colNum == 1);

        columnTitle = "AB";
        colNum = sol.TitleToNumber(columnTitle);
        Console.WriteLine(colNum);
        Debug.Assert(colNum == 28);
    }
}
public class Solution {
    public int TitleToNumber(string columnTitle) {
        int colNum = 0;

        int multiplier = (int)Math.Pow(26, (columnTitle.Length - 1));
        foreach (char letter in columnTitle) {
            colNum += multiplier * ((int)letter - 64);
            multiplier /= 26;
        }
        // colNum += 26 * (columnTitle.Length - 1);

        return colNum;
    }
}