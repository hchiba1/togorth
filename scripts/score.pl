#!/usr/bin/perl -w
use strict;
use File::Basename;
use Getopt::Std;
my $PROGRAM = basename $0;
my $USAGE=
"Usage: $PROGRAM
";

my %OPT;
getopts('', \%OPT);

print "\@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n";
print "\@prefix hop: <http://purl.org/net/orthordf/hOP/ontology#> .\n";
print "\@prefix group: <http://purl.org/net/orthordf/hOP/group/> .\n";
print "\@prefix group_pair: <http://purl.org/net/orthordf/hOP/group_pair/> .\n";
print "\n";

!@ARGV && -t and die $USAGE;
while (<>) {
    chomp;
    my @f = split;
    print "group_pair:$f[1]-$f[2]\n";
    print "    hop:group group:$f[1] ;\n";
    print "    hop:group group:$f[2] ;\n";
    print "    hop:score \"$f[0]\"^^xsd:decimal .\n";
    print "\n";
}
