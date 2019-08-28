# jalalify
Detects and converts dates in the input stream from Gregorian to Jalali and vice versa.

## Install

```
npm install -g jalalify
```

## Usage

```
jalalify [-x] [-f <format>]
```

The default format is YYYY-M-D.

## Example

Convert Gregorian dates in the input stream to Jalali:

```
echo -n 'I was born on 1982-4-1.' | jalalify

# Output:
# I was born on 1361-1-12.
```

Convert Jalali dates in the input stream to Gregorian:

```
echo -n 'I was born on 1361-1-12.' | jalalify -x

# Output:
# I was born on 1982-4-1.
```

Custom date format:

```
echo -n 'I was born on April 1, 1982.' | jalalify -f 'MMMM D, YYYY'

# Output:
# I was born on Farvardin 12, 1361.
```

## Format Specifiers
| Specifier | Example | Description              |
| --------- | ------- | ------------------------ |
| YYYY      | 1982    | 4-digit year             |
| MMMM      | April   | Month name               |
| MMM       | Apr     | Short month name         |
| MM        | 01      | 2-digit month number     |
| M         | 1       | Month number             |
| DD        | 01      | 2-digit day of month     |
| D         | 1       | Day of month             |

## Version History
+ **1.1**
	+ Added support for MM and DD format specifiers.
+ **1.0**
	+ Initial release.

## Author
**Soheil Rashidi**

+ http://soheilrashidi.com
+ http://twitter.com/soheilpro
+ http://github.com/soheilpro

## Copyright and License
Copyright 2015 Soheil Rashidi

Licensed under the The MIT License (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

http://www.opensource.org/licenses/mit-license.php

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
