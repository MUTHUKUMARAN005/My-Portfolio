import type { Part } from "./types";

export const PART6: Part = {
  id: "coding",
  no: "06",
  short: "Coding Round",
  title: "Coding Round (Java)",
  blurb: "Campus-recruitment favourites: arrays, hashing, two pointers, sliding window, binary search, linked lists, stacks, trees, graphs, DP, SQL and OOP — with dry runs and complexity.",
  blocks: [
    {
      kind: "callout",
      tone: "info",
      title: "How to present a coding answer",
      text: "Clarify input/edge cases → state brute force and its complexity → improve with the right pattern → code cleanly → dry-run a small example → state time and space. Speak while you code.",
    },
    { kind: "heading", title: "Arrays, strings & HashMap / HashSet" },
    {
      kind: "code",
      title: "Two Sum (HashMap)",
      problem: "Return the indices of two numbers that add up to the target.",
      code: `import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>(); // value -> index
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[] {2, 7, 11, 15}, 9)));
    }
}`,
      io: "Input : nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]",
      dry: "i=0: need=7, not seen → put(2→0)\ni=1: need=2, found at 0 → return [0, 1]",
      time: "O(n)",
      space: "O(n)",
      why: "Brute force is O(n²). The map turns ‘find the complement’ into an O(1) lookup.",
    },
    {
      kind: "code",
      title: "Contains Duplicate (HashSet)",
      problem: "Return true if any value appears at least twice.",
      code: `public static boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int n : nums) {
        if (!seen.add(n)) return true; // add() returns false if already present
    }
    return false;
}`,
      io: "Input : [1, 2, 3, 1]\nOutput: true",
      time: "O(n)",
      space: "O(n)",
    },
    {
      kind: "code",
      title: "Maximum Subarray (Kadane's algorithm)",
      problem: "Find the contiguous subarray with the largest sum.",
      code: `public static int maxSubArray(int[] nums) {
    int cur = nums[0], best = nums[0];
    for (int i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]); // extend or restart
        best = Math.max(best, cur);
    }
    return best;
}`,
      io: "Input : [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nOutput: 6   (subarray [4, -1, 2, 1])",
      dry: "cur: -2, 1, -2, 4, 3, 5, 6, 1, 5\nbest ends at 6",
      time: "O(n)",
      space: "O(1)",
    },
    { kind: "heading", title: "Two pointers & sliding window" },
    {
      kind: "code",
      title: "Valid Palindrome (two pointers)",
      problem: "Ignoring case and non-alphanumeric characters, is the string a palindrome?",
      code: `public static boolean isPalindrome(String s) {
    int l = 0, r = s.length() - 1;
    while (l < r) {
        while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
        while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
        if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
        l++;
        r--;
    }
    return true;
}`,
      io: 'Input : "A man, a plan, a canal: Panama"  → true\nInput : "race a car"                         → false',
      time: "O(n)",
      space: "O(1)",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Container With Most Water (two pointers) — medium",
      problem: "Given heights, choose two lines that, with the x-axis, hold the most water.",
      code: `public static int maxArea(int[] h) {
    int l = 0, r = h.length - 1, best = 0;
    while (l < r) {
        best = Math.max(best, Math.min(h[l], h[r]) * (r - l));
        if (h[l] < h[r]) l++; else r--;   // move the shorter wall
    }
    return best;
}`,
      io: "Input : [1, 8, 6, 2, 5, 4, 8, 3, 7]\nOutput: 49",
      dry: "l=0,r=8: min(1,7)*8 = 8  → move l\nl=1,r=8: min(8,7)*7 = 49 → best=49, move r\nl=1,r=7: 3*6 = 18\nl=1,r=6: 8*5 = 40\n… remaining areas are smaller → 49",
      time: "O(n)",
      space: "O(1)",
      why: "Moving the taller wall can never increase the area (width shrinks, height is capped by the shorter wall), so always move the shorter one.",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Longest Substring Without Repeating Characters (sliding window) — medium",
      problem: "Length of the longest substring with all distinct characters.",
      code: `public static int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> last = new HashMap<>(); // char -> last index
    int best = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (last.containsKey(c) && last.get(c) >= left) {
            left = last.get(c) + 1;          // jump past the previous occurrence
        }
        last.put(c, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}`,
      io: 'Input : "abcabcbb"\nOutput: 3   ("abc")',
      dry: "r0 a: left0 len1 | r1 b: len2 | r2 c: len3\nr3 a: last[a]=0 ≥ 0 → left=1, len3\nr4 b: last[b]=1 ≥ 1 → left=2, len3\nr5 c: left=3, len3\nr6 b: last[b]=4 ≥ 3 → left=5, len2\nr7 b: left=7, len1 → best=3",
      time: "O(n)",
      space: "O(min(n, alphabet))",
    },
    { kind: "heading", title: "Sorting & binary search" },
    {
      kind: "code",
      title: "Binary Search",
      problem: "Return the index of target in a sorted array, or -1.",
      code: `public static int binarySearch(int[] a, int target) {
    int lo = 0, hi = a.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // avoids int overflow
        if (a[mid] == target) return mid;
        if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      io: "Input : [1, 3, 5, 7, 9, 11], target = 7\nOutput: 3",
      dry: "lo=0,hi=5 → mid=2 (5 < 7) → lo=3\nlo=3,hi=5 → mid=4 (9 > 7) → hi=3\nlo=3,hi=3 → mid=3 (7) → found",
      time: "O(log n)",
      space: "O(1)",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Merge Intervals (sorting) — medium",
      problem: "Merge all overlapping intervals.",
      code: `public static int[][] merge(int[][] intervals) {
    if (intervals.length == 0) return new int[0][];
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> out = new ArrayList<>();
    int[] cur = intervals[0];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= cur[1]) {
            cur[1] = Math.max(cur[1], intervals[i][1]); // overlap → extend
        } else {
            out.add(cur);
            cur = intervals[i];
        }
    }
    out.add(cur);
    return out.toArray(new int[0][]);
}`,
      io: "Input : [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]",
      time: "O(n log n)",
      space: "O(n)",
    },
    { kind: "heading", title: "Linked lists, stacks & queues" },
    {
      kind: "code",
      title: "Reverse a Linked List",
      problem: "Reverse a singly linked list in place.",
      code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int v) { val = v; }
}

public static ListNode reverse(ListNode head) {
    ListNode prev = null, cur = head;
    while (cur != null) {
        ListNode next = cur.next; // 1. remember the rest
        cur.next = prev;          // 2. flip the pointer
        prev = cur;               // 3. advance prev
        cur = next;               // 4. advance cur
    }
    return prev;
}`,
      io: "Input : 1 → 2 → 3 → null\nOutput: 3 → 2 → 1 → null",
      dry: "cur=1: next=2, 1.next=null, prev=1, cur=2\ncur=2: next=3, 2.next=1,    prev=2, cur=3\ncur=3: next=null, 3.next=2, prev=3, cur=null\nreturn prev (3)",
      time: "O(n)",
      space: "O(1)",
    },
    {
      kind: "code",
      title: "Valid Parentheses (stack)",
      problem: "Check whether brackets ()[]{} are balanced and correctly nested.",
      code: `public static boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char open = stack.pop();
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) return false;
        }
    }
    return stack.isEmpty();
}`,
      io: 'Input : "{[()]}" → true\nInput : "(]"     → false',
      time: "O(n)",
      space: "O(n)",
    },
    { kind: "heading", title: "Trees & graphs" },
    {
      kind: "code",
      title: "Level-order traversal (queue) + max depth (recursion)",
      problem: "Return node values level by level, and compute the tree's height.",
      code: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int v) { val = v; }
}

public static List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();             // nodes on this level
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode n = q.poll();
            level.add(n.val);
            if (n.left != null) q.offer(n.left);
            if (n.right != null) q.offer(n.right);
        }
        res.add(level);
    }
    return res;
}

public static int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      io: "Tree : 3 → (9, 20 → (15, 7))\nlevelOrder → [[3], [9, 20], [15, 7]]\nmaxDepth   → 3",
      time: "O(n)",
      space: "O(w) for the queue (w = max width); recursion O(h)",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Number of Islands (graph DFS) — medium",
      problem: "Count groups of connected '1's (land) in a grid.",
      code: `public static int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                sink(grid, r, c);   // mark the whole island as visited
            }
        }
    }
    return count;
}

private static void sink(char[][] g, int r, int c) {
    if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;
    g[r][c] = '0';
    sink(g, r + 1, c); sink(g, r - 1, c);
    sink(g, r, c + 1); sink(g, r, c - 1);
}`,
      io: "Grid:\n11000\n11000\n00100\n00011\nOutput: 3",
      dry: "(0,0) is '1' → count=1, flood (0,0),(0,1),(1,0),(1,1)\n(2,2) is '1' → count=2, flood it\n(3,3) is '1' → count=3, flood (3,3),(3,4)",
      time: "O(R × C)",
      space: "O(R × C) worst-case recursion",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Blast radius via graph BFS (ties to your AIOps project)",
      problem: "Given ‘who depends on whom’, find every service impacted when one fails.",
      code: `public static Set<String> blastRadius(Map<String, List<String>> dependents, String failed) {
    Set<String> impacted = new LinkedHashSet<>();
    Deque<String> q = new ArrayDeque<>();
    q.add(failed);
    while (!q.isEmpty()) {
        String svc = q.poll();
        for (String d : dependents.getOrDefault(svc, List.of())) {
            if (impacted.add(d)) q.add(d);   // visit each service once
        }
    }
    return impacted;
}`,
      io: "Example graph (illustrative, NOT your real 8 services):\ndb → [orders, users]; orders → [gateway]; users → [gateway]\nfailed = db  →  [orders, users, gateway]",
      time: "O(V + E)",
      space: "O(V)",
      why: "‘dependents’ maps a service to services that depend on it — the reverse of the ‘depends-on’ edges. The visited set also prevents infinite loops on cycles.",
    },
    { kind: "heading", title: "Recursion & dynamic programming" },
    {
      kind: "code",
      title: "Climbing Stairs (1-D DP)",
      problem: "You can climb 1 or 2 steps at a time. How many distinct ways to reach step n?",
      code: `public static int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;                 // ways(1), ways(2)
    for (int i = 3; i <= n; i++) {
        int c = a + b;                // ways(i) = ways(i-1) + ways(i-2)
        a = b;
        b = c;
    }
    return b;
}`,
      io: "Input : n = 5\nOutput: 8",
      dry: "i=3: c=3 (a=2,b=3)\ni=4: c=5 (a=3,b=5)\ni=5: c=8 (a=5,b=8) → 8",
      time: "O(n)",
      space: "O(1)",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Coin Change (DP) — medium",
      problem: "Fewest coins needed to make the amount, or -1 if impossible.",
      code: `public static int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);      // 'infinity'
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int coin : coins) {
            if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      io: "Input : coins = [1, 2, 5], amount = 11\nOutput: 3   (5 + 5 + 1)",
      dry: "dp[0..11] = 0,1,1,2,2,1,2,2,3,3,2,3\ndp[11] = min(dp[10]+1, dp[9]+1, dp[6]+1) = 3",
      time: "O(amount × coins)",
      space: "O(amount)",
    },
    {
      kind: "code",
      level: "advanced",
      title: "Subsets (recursion / backtracking)",
      problem: "Return all subsets of a set of distinct integers.",
      code: `public static List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), res);
    return res;
}

private static void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
    res.add(new ArrayList<>(path));            // record the current subset
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);                     // choose
        backtrack(nums, i + 1, path, res);     // explore
        path.remove(path.size() - 1);          // un-choose
    }
}`,
      io: "Input : [1, 2, 3]\nOutput: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]",
      time: "O(n × 2ⁿ)",
      space: "O(n) recursion (excluding output)",
    },
    { kind: "heading", title: "SQL query-writing", sub: "Assume Employee(id, name, salary, department_id, manager_id) and Department(id, name)." },
    {
      kind: "code",
      title: "Second highest salary",
      problem: "Return the second highest distinct salary (NULL if none).",
      code: `SELECT MAX(salary) AS second_highest
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- Window-function alternative (also generalises to Nth highest)
SELECT DISTINCT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM Employee
) t
WHERE rnk = 2;`,
      io: "Salaries: 100, 200, 300, 300 → 200",
      time: "O(n) scan (index on salary can help)",
      space: "O(1) extra",
    },
    {
      kind: "code",
      title: "Employees earning more than their manager (self join)",
      problem: "List employees whose salary exceeds their manager's salary.",
      code: `SELECT e.name AS employee
FROM Employee e
JOIN Employee m ON e.manager_id = m.id
WHERE e.salary > m.salary;`,
      io: "e(salary 90, manager m salary 80) → returned",
      time: "O(n) with index on id",
      space: "O(1) extra",
    },
    {
      kind: "code",
      title: "Highest salary in each department (join + subquery)",
      problem: "Return department name, employee and salary for the top earner(s) per department.",
      code: `SELECT d.name AS department, e.name AS employee, e.salary
FROM Employee e
JOIN Department d ON e.department_id = d.id
WHERE (e.department_id, e.salary) IN (
  SELECT department_id, MAX(salary)
  FROM Employee
  GROUP BY department_id
);`,
      io: "IT → Max 90; HR → Anu 70",
      time: "Plan-dependent (scan + group)",
      space: "O(departments)",
    },
    {
      kind: "code",
      title: "Find duplicate emails (GROUP BY + HAVING)",
      problem: "Find email addresses that appear more than once.",
      code: `-- assuming Person(id, email)
SELECT email, COUNT(*) AS occurrences
FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
      io: "a@x.com (2 rows) → returned",
      time: "O(n) with hashing/sorting",
      space: "O(distinct emails)",
    },
    { kind: "heading", title: "OOP coding tasks" },
    {
      kind: "code",
      title: "Bank Account — encapsulation, custom exception, thread safety",
      problem: "Model an account with validated deposit/withdraw and a custom checked exception.",
      code: `class InsufficientFundsException extends Exception {
    InsufficientFundsException(String msg) { super(msg); }
}

class Account {
    private final String id;
    private double balance;           // private → encapsulation

    Account(String id, double opening) {
        this.id = id;
        this.balance = opening;
    }

    public synchronized void deposit(double amt) {
        if (amt <= 0) throw new IllegalArgumentException("Deposit must be positive");
        balance += amt;
    }

    public synchronized void withdraw(double amt) throws InsufficientFundsException {
        if (amt > balance) throw new InsufficientFundsException("Balance " + balance + " < " + amt);
        balance -= amt;
    }

    public synchronized double getBalance() { return balance; }
}`,
      io: "new Account(\"A1\", 100); deposit(50) → 150; withdraw(500) → InsufficientFundsException",
      time: "O(1) per operation",
      space: "O(1)",
      why: "Mention that real money should use BigDecimal (not double) and that synchronized prevents lost updates between threads.",
    },
    {
      kind: "code",
      title: "Shapes — polymorphism with Java 17 records & sealed interface",
      problem: "Model shapes with a common area() contract that cannot be extended arbitrarily.",
      code: `import java.util.List;

sealed interface Shape permits Circle, Rectangle {
    double area();
}

record Circle(double r) implements Shape {
    public double area() { return Math.PI * r * r; }
}

record Rectangle(double w, double h) implements Shape {
    public double area() { return w * h; }
}

public class ShapeDemo {
    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(1), new Rectangle(2, 3));
        for (Shape s : shapes) {
            System.out.printf("%s -> %.2f%n", s, s.area());
        }
    }
}`,
      io: "Circle[r=1.0] -> 3.14\nRectangle[w=2.0, h=3.0] -> 6.00",
      time: "O(n) over the list",
      space: "O(n)",
      why: "Records give immutable data classes with equals/hashCode/toString for free; sealed restricts the hierarchy so the compiler knows all subtypes.",
    },
  ],
};
