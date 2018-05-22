from docutils import nodes
from docutils.parsers.rst import Directive
from docutils.parsers.rst.directives.admonitions import BaseAdmonition, Note
from sphinx.locale import _

def setup(app):
    app.add_stylesheet('css/example.css')
    app.add_node(example,
                 html=(visit_example_node, depart_example_node),
                 latex=(visit_example_node, depart_example_node),
                 text=(visit_example_node, depart_example_node))

    app.add_directive('example', ExampleDirective)

    return {'version': '0.1'}

class example(nodes.Admonition, nodes.Element): pass

class ExampleDirective(BaseAdmonition):
    node_class = example

def visit_example_node(self, node):
    self.body.append(self.starttag(node, 'div', CLASS=('admonition example')))
    node.insert(0, nodes.title('example', 'Example'))
    self.set_first_last(node)

def depart_example_node(self, node):
    self.depart_admonition(node)
