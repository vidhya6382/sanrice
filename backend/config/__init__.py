# Use PyMySQL as the MySQL driver when it is installed (handy on Python 3.14,
# where mysqlclient wheels may be missing). Otherwise Django uses mysqlclient.
try:
    import pymysql

    pymysql.version_info = (2, 2, 1, "final", 0)
    pymysql.install_as_MySQLdb()
except ImportError:
    pass
